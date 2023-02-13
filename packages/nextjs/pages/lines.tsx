import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { useContract, useProvider, useNetwork, useSigner, useAccount } from "wagmi";

import { getDeployedContract } from "../components/scaffold-eth/Contract/utilsContract";
import { ContractInterface } from "ethers";
import { toast } from "~~/utils/scaffold-eth";
import { formatEther } from "ethers/lib/utils.js";

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

  async function getPendingMatic() {
    const pendingMatic = await linesContract?.pendingMatic(account);
    setPendingMatic(pendingMatic);
  }

  async function uploadLines() {
    const lines = await linesContract?.uploadLines(newLines, newUID);
    // use toast to display success message
    if (lines) toast.success("Lines Updated");
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
    const _LENGTH = await linesContract?.LINE_LENGTH();
    const _PRICE = await linesContract?.LINE_PRICE();
    setLineLength(_LENGTH);
    setLinePrice(_PRICE);
  }

  useEffect(() => {
    if (linesContract) {
      setPageLines(10);
      getPendingMatic();
      getContractData();
      get10LinesUnsorted();
    }
  }, [linesContract, sortedLines]);

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
        <div className="flex items-center my-5">
          <button
            className="btn font-bold w-auto mx-auto "
            onClick={async () => {
              await get10LinesUnsorted();
            }}
          >
            reset
          </button>

          <label htmlFor="modal-post" className="btn font-bold w-auto my-5 ">
            post
          </label>
          <label htmlFor="modal-get" className="btn w-auto my-5">
            goTo
          </label>
          <button
            className="btn w-auto my-5"
            onClick={async () => {
              await withdraw();
            }}
            disabled={pendingMatic === 0}
          >
            withdraw {formatEther(pendingMatic)}
          </button>
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
                    <div className="flex flex-col items-left w-full my-2 font-mono">
                      {sortedLines.map((line, index) => (
                        <table className="table-caption" key={index}>
                          <tr>
                            <td>{line.str}</td>
                          </tr>
                        </table>
                      ))}
                    </div>
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
        <div className="flex flex-row justify-center w-full bg-transparent my-5 ">
          {unsortedLines ? (
            <div className="flex flex-col w-full my-2">
              <table className="table-compact w-full">
                <tbody>
                  <div className="h-auto w-full">
                    {unsortedLines.map((line, index) => (
                      <tr key={index}>
                        <td className="text-sm font-mono">{Number(line.uid)}</td>
                        <td className="text-sm font-mono">{Number(line.edits)} edits</td>
                        <td className="text-sm font-mono"> ▷▷▷</td>
                        <td className="text-sm font-mono">{line.str}</td>
                      </tr>
                    ))}
                  </div>
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
