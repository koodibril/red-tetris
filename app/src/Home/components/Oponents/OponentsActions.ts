
export const calculateStyles = (users: number) => {
    const styles = {
    cellSize: "",
    borderSize: "",
    paddingTop: "",
    paddingLeft: "",
    paddingRight: "",
    paddingBottom: "",
  };
  switch (true) {
    case users <= 2:
      styles.cellSize = "30px";
      styles.borderSize = "10px";
      styles.paddingLeft = "5%";
      styles.paddingTop = "10%";
      styles.paddingBottom = "0px";
      styles.paddingRight = "5%";
      break;
    case users <= 4:
      styles.cellSize = "20px";
      styles.borderSize = "5px";
      styles.paddingLeft = "5%";
      styles.paddingTop = "5%";
      styles.paddingBottom = "0px";
      styles.paddingRight = "5%";
      break;
    case users <= 8:
      styles.cellSize = "15px";
      styles.borderSize = "5px";
      styles.paddingLeft = "5px";
      styles.paddingTop = "10%";
      styles.paddingBottom = "0px";
      styles.paddingRight = "5px";
      break;
    case users <= 16:
      styles.cellSize = "8px";
      styles.borderSize = "2px";
      styles.paddingLeft = "5%";
      styles.paddingTop = "10%";
      styles.paddingBottom = "0px";
      styles.paddingRight = "0px";
      break;
  }
  return styles;
};