import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../state/index";
import "../App.scss";
import { getTicketsFromServer, restoreTickets } from "../state/actions/index";
import TicketComp from "./TicketComp";
import Loader from "react-loader-spinner";

function TicketsComp() {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state.tickets);
  const [labelsArr, setLabelsArr] = useState<string[]>([]);

  useEffect(() => {
    let FilterParams = {
      searchVal: "",
      pageNum: 1,
      labels: labelsArr,
    };
    dispatch(getTicketsFromServer(FilterParams));
  }, [dispatch]);

  const restoreAllHidden = () => {
    dispatch(restoreTickets());
  };

  const addLabelToFilter = (label: string) => {
    let noDuplicates = new Set([label, ...labelsArr]);
    setLabelsArr(Array.from(noDuplicates));
    let FilterParams = {
      searchVal: state.search,
      pageNum: 1,
      labels: Array.from(noDuplicates),
    };
    dispatch(getTicketsFromServer(FilterParams));
  };

  const removeLabelFromFilter = (label: string) => {
    setLabelsArr(labelsArr.filter((l) => l !== label));
    let FilterParams = {
      searchVal: state.search,
      pageNum: 1,
      labels: labelsArr.filter((l) => l !== label),
    };
    dispatch(getTicketsFromServer(FilterParams));
  };

  return (
    <div>
      {state.tickets ? (
        <div className="results">
          Showing {state.tickets.length} results (
          {state.hiddenCurrentPageTickets.length} hidden tickets -{" "}
          <span id="restoreTickets" onClick={() => restoreAllHidden()}>
            restore
          </span>
          )
        </div>
      ) : null}

      {state.tickets ? (
        state.tickets.map((ticket) => (
          <ul key={ticket.id} className="tickets">
            <li className="ticket">
              <TicketComp
                id={ticket.id}
                title={ticket.title}
                content={ticket.content}
                creationTime={ticket.creationTime}
                labels={ticket.labels}
                userEmail={ticket.userEmail}
                addLabelToParent={(arr) => addLabelToFilter(arr)}
                removeLabelFromParent={(arr) => removeLabelFromFilter(arr)}
                clickedLabels={labelsArr}
              />
            </li>
          </ul>
        ))
      ) : (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      )}
    </div>
  );
}

export default TicketsComp;
