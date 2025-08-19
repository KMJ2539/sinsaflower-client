import { clientRequest } from "@/shared/lib/http/client";
import { OrderFormValues } from "../types/orderFormValues";

//발주
export async function createOrder(orderFormData: OrderFormValues) {
  const { productImage, ...rest } = orderFormData;

  const formData = new FormData();
  formData.append(
    "request",
    new Blob([JSON.stringify(rest)], { type: "application/json" })
  );
  if (productImage) formData.append("productImage", productImage);

  return clientRequest({
    url: "/api/order/create",
    method: "POST",
    data: formData,
  });
}
