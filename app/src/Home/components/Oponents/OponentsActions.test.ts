import { calculateStyles } from "./OponentsActions";

const emptyStyle = {
cellSize: "",
borderSize: "",
paddingTop: "",
paddingLeft: "",
paddingRight: "",
paddingBottom: "",
};

test('calculateStyles', () => {
    const styles = {...emptyStyle};
    styles.cellSize = "30px";
    styles.borderSize = "10px";
    styles.paddingLeft = "5%";
    styles.paddingTop = "10%";
    styles.paddingBottom = "0px";
    styles.paddingRight = "5%";
    expect(calculateStyles(1)).toStrictEqual(styles);
    styles.cellSize = "20px";
    styles.borderSize = "5px";
    styles.paddingLeft = "5%";
    styles.paddingTop = "5%";
    styles.paddingBottom = "0px";
    styles.paddingRight = "5%";
    expect(calculateStyles(3)).toStrictEqual(styles);
    styles.cellSize = "15px";
    styles.borderSize = "5px";
    styles.paddingLeft = "5px";
    styles.paddingTop = "10%";
    styles.paddingBottom = "0px";
    styles.paddingRight = "5px";
    expect(calculateStyles(5)).toStrictEqual(styles);
    styles.cellSize = "8px";
    styles.borderSize = "2px";
    styles.paddingLeft = "5%";
    styles.paddingTop = "10%";
    styles.paddingBottom = "0px";
    styles.paddingRight = "0px";
    expect(calculateStyles(9)).toStrictEqual(styles);
});
