import React, { useEffect, useState } from "react";
import "../App.scss";
import { useDispatch, useSelector } from "react-redux";
import { hideTicket } from "../state/actions/index";
import ShowMoreText from "react-show-more-text";
import { State } from "../state/index";

interface ITicketProps {
  id: string;
  title: string;
  content: string;
  creationTime: number;
  labels: string[] | undefined;
  userEmail: string;
  addLabelToParent: (labels: string) => void;
  removeLabelFromParent: (label: string) => void;
  clickedLabels: string[];
}

function TicketComp(props: React.PropsWithChildren<ITicketProps>) {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state.tickets);
  const [labelsArr, setLabelsArr] = useState<string[]>([]);

  const addToHidden = (id: string) => {
    dispatch(hideTicket(id));
  };

  const labelClicked = (e: React.MouseEvent<HTMLElement>) => {
    let label = e.currentTarget.getAttribute("value");

    if (label && props.clickedLabels.filter((l) => l === label).length === 0) {
      setLabelsArr([...labelsArr, label]);
      props.addLabelToParent(label);
    } else if (
      label &&
      props.clickedLabels.filter((l) => l === label).length > 0
    ) {
      setLabelsArr(labelsArr.filter((item) => item !== label));
      props.removeLabelFromParent(label);
    }
    console.log(e.currentTarget.getAttribute("value"));
  };

  return (
    <div>
      <div className="hide" onClick={() => addToHidden(props.id)}>
        {" "}
        Hide
      </div>
      <h5 className="title">{props.title}</h5>

      <ShowMoreText
        /* Default options */
        lines={3}
        more="Show more"
        less="Show less"
        expanded={false}
        width={0}
        truncatedEndingComponent={"... "}
      >
        <p className="content">{props.content}</p>
      </ShowMoreText>

      {props.labels ? (
        <ul className="labels">
          {props.labels.map((l) => (
            <li key={l} className="labelButton">
              <button
                key={l}
                className="label"
                onClick={(e) => labelClicked(e)}
                value={l}
                style={
                  props.clickedLabels.filter((item) => item == l).length > 0
                    ? { background: "rgb(245, 214, 202)" }
                    : { background: "rgb(202, 228, 245)" }
                }
              >
                {l}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <footer>
        <div className="meta-data">
          By {props.userEmail} | {new Date(props.creationTime).toLocaleString()}
        </div>
      </footer>
    </div>
  );
}

export default TicketComp;
