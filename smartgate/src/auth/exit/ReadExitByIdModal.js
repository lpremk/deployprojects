import { printDiv } from "../../util/Print";
import ReadExitById from "./ReadExitById";

export default function ReadExitByIdModal(props){
    return(
        <>
            <div class="modal fade" id="viewDetailsModal" tabindex="-1" aria-labelledby="viewDetailsModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h1 class="modal-title fs-5" id="viewDetailsModalLabel">Smart Gate</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>props.closeModelHandler()}></button>
                        </div>
                        <div class="modal-body">
                            <ReadExitById exitId={props.exitId}/>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onClick={() => printDiv('printViewDetails')}>Print</button>
                        </div>
                    </div>
                    </div>
            </div>
    </>
    );
}