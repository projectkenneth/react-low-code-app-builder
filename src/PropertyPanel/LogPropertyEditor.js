const LogPropertyEditor = ({ codeData, updateData }) => {
    const type = codeData.type;
    const localData = codeData.data;

    if (type === "log") {
        const onMessageChange = (event) => {
            localData.message = event.target.value;

            updateData(localData);
        };

        return (
            <div>
                <strong>Log:</strong><br />
                <input name="log_message" type="text" defaultValue={localData.message} placeholder="Message" onChange={onMessageChange} />
            </div>
        );
    }

    return null;
};

export default LogPropertyEditor;