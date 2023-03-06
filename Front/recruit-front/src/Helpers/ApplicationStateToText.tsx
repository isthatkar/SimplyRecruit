import { Stage } from "../Types/types";

function GetStateLabel(state: Stage) {
  switch (state) {
    case Stage.New:
      return "New";
    case Stage.FinalInterview:
      return "Final interview";
    case Stage.FirstInterview:
      return "First interview";
    case Stage.Hired:
      return "Hired";
    case Stage.Offer:
      return "Offer sent";
    case Stage.PhoneScreen:
      return "Phone screen";
    case Stage.TechTask:
      return "Tech task";
    case Stage.TechnicalInterview:
      return "Tech interview";
  }
}

export default GetStateLabel;
