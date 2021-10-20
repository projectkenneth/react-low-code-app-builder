import IfPropertyEditor from "./PropertyPanel/IfPropertyEditor";
import AssignPropertyEditor from "./PropertyPanel/AssignPropertyEditor";
import LogPropertyEditor from "./PropertyPanel/LogPropertyEditor";

const Config = {
    if: {
        propertyEditorComponent: IfPropertyEditor
    }, 
    assign: {
        propertyEditorComponent: AssignPropertyEditor
    },
    log: {
        propertyEditorComponent: LogPropertyEditor
    }
}

export default Config;