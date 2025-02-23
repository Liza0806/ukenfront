import { useDispatch } from 'react-redux';
import { setPaymentStatus, setError } from '../../redux/slices/paymentSlice';
import { useAppSelector } from '../../redux/hooks/hooks';

interface LiqPayWidgetProps {
    amount: number;
    currency: string;
    description: string;
    orderId: string;
  }

export const LiqPayWidget: React.FC<LiqPayWidgetProps> = ({ amount, currency, description, orderId }) => {
  const dispatch = useDispatch();
  const paymentStatus = useAppSelector((state) => state.payments.paymentStatus);
  const error = useAppSelector((state) => state.payments.error);

  const initiatePayment = async () => {
    try {
      const response = await fetch("https://ukenback.vercel.app/api/payment/create-payment", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency, description, order_id: orderId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment');
      }

      const { data, signature } = await response.json();

      LiqPayCheckout.init({
        data,
        signature,
        embedTo: "#liqpay_checkout",
        mode: "popup",
      }).on("liqpay.callback", function (data: { status: string }) {
        console.log("Payment status:", data.status);
        dispatch(setPaymentStatus(data.status)); // обновляем статус платежа в Redux
      }).on("liqpay.ready", function () {
        console.log("Widget is ready");
      }).on("liqpay.close", function () {
        console.log("Widget is closed");
      });

    } catch (error: unknown) {
  console.error("Payment initiation failed:", error);
  if (error instanceof Error) {
    dispatch(setError(error.message)); // обновляем ошибку в Redux
  } else {
    dispatch(setError("Неизвестная ошибка")); // обрабатываем случай, если это не объект Error
  }
}
  };

  return (
    <div>
      <button onClick={initiatePayment}>Оплатить через LiqPay</button>
      <div id="liqpay_checkout"></div>
      {error && <div className="error">{error}</div>}
      {paymentStatus && <div className="status">{`Статус платежа: ${paymentStatus}`}</div>}
    </div>
  );
};
