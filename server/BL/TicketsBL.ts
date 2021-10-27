import { Ticket } from "../temp-data";

export type filteredResults = {
  finalResult: Ticket[];
  searchingText: string;
};
export const filterTickets = function (
  searchVal: string,
  tempData: Ticket[],
  matchesArrBeforeAfter: string[],
  matchesArrEmail: string[],
  labels: string[]
): filteredResults {
  let beforeOrAfter = "";
  let dateFromRegex = "";
  let after = false;
  let date = 0;
  let matchStringBeforeAfterDate = "";
  if (matchesArrBeforeAfter) {
    beforeOrAfter = matchesArrBeforeAfter[0].split(":")[0].trim();
    if (beforeOrAfter === "after") after = true;
    else if (beforeOrAfter === "before") after = false;
    dateFromRegex = matchesArrBeforeAfter[0].split(":")[1].trim();
    let parts_of_date = dateFromRegex.split("/"); // 01/09/2018
    let output = new Date(
      Number(parts_of_date[2]),
      Number(parts_of_date[1]) - 1,
      Number(parts_of_date[0]) + 1
    );
    date = new Date(output).getTime();
    matchStringBeforeAfterDate = matchesArrBeforeAfter.join(" ");
  }

  let emailFromRegex = "";
  let matchStringFromEmail = "";
  if (matchesArrEmail) {
    emailFromRegex = matchesArrEmail[0].split(":")[1].trim();
    matchStringFromEmail = matchesArrEmail.join(" ");
  }

  if (matchStringBeforeAfterDate !== "") {
    searchVal = searchVal.substring(matchStringBeforeAfterDate.length);
  }
  if (matchStringFromEmail !== "") {
    searchVal = searchVal.substring(
      0,
      searchVal.length - matchStringFromEmail.length
    );
  }
  let searchingText = searchVal.trim();

  let finalResult: Ticket[] = tempData;
  if (emailFromRegex !== "") {
    finalResult = finalResult.filter((t) => t.userEmail === emailFromRegex);
  }

  if (date !== 0) {
    finalResult = finalResult.filter(function (t) {
      if (after) {
        return t.creationTime > date; //after
      } else {
        return t.creationTime <= date; //before
      }
    });
  }

  finalResult = finalResult.filter(function (t) {
    return (t.title.toLowerCase() + t.content.toLowerCase()).includes(
      searchingText.toLowerCase()
    );
  });

  if (labels.length > 0) {
    finalResult = finalResult.filter((t) =>
      labels.some((l) => t.labels?.includes(l))
    );
  }

  return { finalResult: finalResult, searchingText: searchingText };
};
