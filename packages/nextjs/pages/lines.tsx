import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { useContract, useProvider, useNetwork, useSigner, useAccount } from "wagmi";
import { getDeployedContract } from "../components/scaffold-eth/Contract/utilsContract";
import { ContractInterface, Transaction } from "ethers";
import { toast } from "~~/utils/scaffold-eth";
import { formatEther, parseEther } from "ethers/lib/utils.js";

const Lines: NextPage = () => {
  //define type EXPORTLINE
  const { chain } = useNetwork();
  const { data: signer } = useSigner();
  const account = useAccount();
  const provider = useProvider();

  const [readIndex, setReadIndex] = React.useState(0);
  const [readUID, setReadUID] = React.useState(0);
  const [singleLine, setSingleLine] = React.useState("");
  const [singleUID, setSingleUID] = React.useState(0);
  const [newLines, setNewLines] = React.useState<string[]>([]);
  const [newUID, setNewUID] = React.useState<number[]>([]);
  const [unsortedLines, setUnsortedLines] = React.useState<EXPORTLINE[]>([]);
  const [sortedLines, setSortedLines] = React.useState<LINE[]>([]);
  const [pageLines, setPageLines] = React.useState(0);
  const [pendingMatic, setPendingMatic] = React.useState(0);
  const [line_length, setLineLength] = React.useState(0);
  const [line_price, setLinePrice] = React.useState(0);

  const deployedContract = getDeployedContract(chain?.id.toString(), "Lines");

  let linesAddress!: string;
  let linesAbi: ContractInterface = [];

  if (deployedContract) {
    ({ address: linesAddress, abi: linesAbi } = deployedContract);
  }

  const linesContract = useContract({
    address: linesAddress,
    abi: linesAbi,
    signerOrProvider: signer ? signer : provider,
  });

  type EXPORTLINE = {
    uid: number;
    str: string;
    edits: number;
  };

  type LINE = {
    str: string;
    edits: number;
    lastEditor: string;
  };

  // Function to Add a line to array
  function addLine(string: string, uid: number) {
    newLines.push(string);
    newUID.push(uid);
    setNewLines(newLines);
    setNewUID(newUID);
    setNewLines([...newLines]);
  }

  function removeLine() {
    newLines.pop();
    newUID.pop();
    setNewLines([...newLines]);
  }

  async function getEdits() {
    let edits = 0;
    for (let i = 0; i < newUID.length; i++) {
      const lines = await linesContract?.getLines(newUID[i], 1);
      edits += lines[0].edits;
    }
    return edits;
  }

  async function getPendingMatic() {
    if (account) {
      const _pendingMatic = await linesContract?.pendingMatic(account?.address);
      setPendingMatic(_pendingMatic);
    }
  }

  async function uploadLines() {
    if (!linesContract) {
      toast.error("No Contract");
      return;
    }

    if (newLines.length === 0) {
      toast.error("No new lines to upload");
      return;
    }

    const edits = await getEdits();
    const value = edits * Number(formatEther(line_price));

    toast.info("Uploading Lines");

    const lines: Transaction = await linesContract?.uploadLines(newLines, newUID, {
      value: parseEther(value.toString()),
    });
    toast.info("Waiting for transaction to be mined");

    while (!lines.hash) {
      toast.info("Waiting for transaction to be mined");
    }

    linesContract?.on("LineUpdated", (uid: number, str: string, edits: number) => {
      toast.success("New Line Added");
      get10LinesUnsorted();
      console.log(uid, str, edits);
    });

    // handle error if transaction reverts
    linesContract?.on("error", (error: any) => {
      toast.error("Transaction Reverted");
      toast.error(error);
    });
  }

  async function getLines() {
    const lines = await linesContract?.getLines(readIndex, readUID);
    setSortedLines(lines);
  }

  async function getLinesUnsorted() {
    const uids = [];
    for (let i = 0; i < pageLines; i++) {
      uids[i] = i;
    }
    const _unsortedLines = await linesContract?.getLinesUnordered(uids);
    setUnsortedLines(_unsortedLines);
  }

  async function get10LinesUnsorted() {
    const unsortedLines: React.SetStateAction<{ uid: number; str: string; edits: number }[]> = [];
    setUnsortedLines(unsortedLines);
    const uids = [];
    for (let i = 0; i < 10; i++) {
      uids[i] = i;
    }
    const _unsortedLines = await linesContract?.getLinesUnordered(uids);
    setUnsortedLines(_unsortedLines);
    setPageLines(15);
  }

  async function withdraw() {
    const withdraw = await linesContract?.withdraw();
    if (withdraw) toast.success("MATIC Withdrawn");
  }

  function loadNextPage() {
    setPageLines(pageLines + 10);
    getLinesUnsorted();
  }

  function getNewLines() {
    return newLines;
  }

  async function getContractData() {
    const _LENGTH: number = await linesContract?.LINE_LENGTH();
    const _PRICE: number = await linesContract?.LINE_PRICE();
    setLineLength(_LENGTH);
    setLinePrice(_PRICE);
  }

  useEffect(() => {
    if (linesContract && deployedContract && account) {
      setPageLines(10);
      getPendingMatic();
      getContractData();
      get10LinesUnsorted();
    }
  }, [linesContract, sortedLines, signer]);

  return (
    <>
      <Head>
        <title>L I N E S</title>
        <meta name="description" content="Lines Open Board" />
      </Head>
      <div className="flex items-center flex-col flex-grow w-3/4 justify-center text-left mx-auto my-2">
        {line_length && line_price && (
          <div className="flex flex-row text-left ">
            {/* <div className="flex mx-5">
              <div className="text-xl font-medium">LENGTH:</div>
              <div className="text-xl">{Number(line_length)} </div>
            </div>
            <div className="flex mx-5">
              <div className="text-xl font-medium">PRICE:</div>
              <div className="text-xl mx-2">{formatEther(line_price)} MATIC</div>
            </div> 
            <div className="flex mx-5 ">
              <div className="text-base font-medium">PENDING REWARD</div>
              <div className="text-base mx-2">{formatEther(pendingMatic)}</div>
            </div>*/}
          </div>
        )}
        <div className="flex-auto align-top my-5">
          <button
            className="btn font-bold w-auto mx-2"
            onClick={async () => {
              await get10LinesUnsorted();
            }}
          >
            reset
          </button>

          <label htmlFor="modal-post" className="btn font-bold w-auto mx-2 ">
            post
          </label>
          <label htmlFor="modal-get" className="btn w-auto mx-2">
            goTo
          </label>
          {Number(pendingMatic) > 0 && (
            <button
              className="btn w-auto mx-2"
              onClick={async () => {
                await withdraw();
              }}
              disabled={pendingMatic === 0}
            >
              withdraw {formatEther(pendingMatic)}
            </button>
          )}
        </div>
        <div>
          <input type="checkbox" id="modal-post" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <div className="card w-auto bg-base-100 shadow-xl px-5 my-5">
                <div className="text-center text-lg">Content</div>
                <input
                  type="text"
                  className="input input-bordered my-2"
                  onChange={e => {
                    setSingleLine(e.target.value);
                  }}
                />
                <div className="text-center text-lg  my-2">Line ID</div>
                <input
                  type="text"
                  className="input input-bordered my-2"
                  onChange={e => {
                    setSingleUID(Number(e.target.value));
                  }}
                />
                <button
                  className="btn w-full my-2"
                  onClick={() => {
                    addLine(singleLine, singleUID);
                  }}
                >
                  Add
                </button>
                <button
                  className="btn w-full my-2"
                  onClick={async () => {
                    removeLine();
                  }}
                >
                  Remove
                </button>
                {getNewLines() && getNewLines().length > 0 && (
                  <div>
                    <div className="text-center text-lg">Preview</div>
                    <ul>
                      {getNewLines().map((line, index) => (
                        <li key={index}>
                          {Number(newUID[index])} {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  className="btn btn-secondary w-full my-2"
                  onClick={async () => {
                    await uploadLines();
                  }}
                >
                  Upload Lines
                </button>
              </div>
              <div className="modal-action">
                <label htmlFor="modal-post" className="btn">
                  Close
                </label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <input type="checkbox" id="modal-get" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <div className="card w-auto h-auto bg-base-100 shadow-xl px-5">
                <div className="text-center text-lg">Get Lines</div>
                <input
                  type="text"
                  className="input input-bordered my-5"
                  placeholder="from line number"
                  onChange={e => {
                    setReadIndex(Number(e.target.value));
                  }}
                />{" "}
                <input
                  type="text"
                  className="input input-bordered my-5"
                  placeholder="request count number"
                  onChange={e => {
                    setReadUID(Number(e.target.value));
                  }}
                />
                <button
                  className="btn w-full my-5"
                  onClick={async () => {
                    await getLines();
                  }}
                >
                  Get Lines
                </button>
                <div>
                  {sortedLines ? (
                    <table className="flex flex-col items-left w-full my-2 font-mono">
                      {sortedLines.map((line, index) => (
                        <tr key={index}>
                          <td>{line.str}</td>
                        </tr>
                      ))}
                    </table>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full">null</div>
                  )}
                </div>
              </div>
              <div className="modal-action">
                <label htmlFor="modal-get" className="btn">
                  Close
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-auto  w-full bg-transparent ">
          {unsortedLines ? (
            <div className="flex flex-col overflow-y-scroll anchor h-96" id="anchor">
              <table className="table-compact w-3/4 mx-auto ">
                <tbody>
                  {unsortedLines.map(line => (
                    <tr key={line.uid}>
                      <td className="text-sm font-mono">{Number(line.uid)}</td>
                      <td className="text-sm font-mono">{Number(line.edits)} edits</td>
                      <td className="text-sm font-mono">{line.str}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full">null</div>
          )}
        </div>
        <button
          className=" text-xl font-medium fixed z-90 bottom-20 right-8 bg-transparent w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center  hover:bg-gray-600 hover:drop-shadow-2xl hover:animate-bounce duration-200"
          onClick={loadNextPage}
        >
          more
        </button>
      </div>
    </>
  );
};

export default Lines;
