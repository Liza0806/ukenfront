declare var LiqPayCheckout: {
    init: (config: {
      data: string;
      signature: string;
      embedTo: string;
      mode: "popup" | "embed";
    }) => {
      on: (event: "liqpay.callback" | "liqpay.ready" | "liqpay.close", callback: (data: any) => void) => LiqPayCheckout; // Возвращает сам объект
    };
  };
  