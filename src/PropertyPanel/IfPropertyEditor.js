const options = [
    { value: "=", label: "=" },
    { value: "<=", label: "<=" },
    { value: "<", label: "<" },
    { value: "=>", label: "=>" },
    { value: ">", label: ">" },
    { value: "!=", label: "!=" },
];

const IfPropertyEditor = ({ codeData, updateData }) => {
    const type = codeData.type;
    const localData = codeData.data;

    if (type === "if") {
        const onLeftChange = (event) => {
            localData.left = event.target.value;

            updateData(localData);
        };

        const onConditionChange = (event) => {
            localData.condition = event.target.value;

            updateData(localData);
        };

        const onRightChange = (event) => {
            localData.right = event.target.value;

            updateData(localData);
        };

        const renderOptions = () =>
            options.map(opt =>
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            );

        return (
            <div>
                <strong>If:</strong><br />
                <input name="if_left" type="text" defaultValue={localData.left} placeholder="Left" onChange={onLeftChange} size="7" />
                &nbsp;<select name="if_cond" onChange={onConditionChange} defaultValue={localData.condition}>
                    {renderOptions()}
                </select>&nbsp;
                <input name="if_right" type="text" defaultValue={localData.right} placeholder="Right" onChange={onRightChange} size="7" />
            </div>
        );
    }

    return null;
};

export default IfPropertyEditor;