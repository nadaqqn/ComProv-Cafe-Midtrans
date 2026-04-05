export const loadMidtransScript = () => {
  return new Promise((resolve, reject) => {
    if (document.getElementById("midtrans-script")) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.id = "midtrans-script";
    script.src =
      process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true"
        ? "https://app.midtrans.com/snap/snap.js"
        : "https://app.sandbox.midtrans.com/snap/snap.js";

    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
    );

    script.onload = resolve;
    script.onerror = reject;

    document.body.appendChild(script);
  });
};
