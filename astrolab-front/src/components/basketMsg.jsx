const BasketMsg = (props) => {
  return (
    <div className="Basket__msg">
      <p
        className="Basket__close"
        onClick={(e) => {
          props.onClickClose();
        }}
      ></p>
      <h4>Merci !</h4>
      <p>{props.msg}</p>
      <button
        className="Basket__msg-btn"
        onClick={(e) => {
          props.onClickClose();
        }}
      >
        Continuer vos achats
      </button>
    </div>
  );
};
export default BasketMsg;
