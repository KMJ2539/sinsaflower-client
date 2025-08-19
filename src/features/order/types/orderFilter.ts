import { OrderStatus } from "./orderStatus";

export type OrderFilter = {
  dateField?: string;
  startDate?: string;
  endDate?: string;
  orderStatus?: OrderStatus | undefined;
  searchField?: string;
  searchKeyword?: string;
};
