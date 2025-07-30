export const registerDefaultValues: RegisterFormInputs = {
  // User 정보
  userId: "",
  name: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
  email: "",
  profileImage: "",
  userType: "BUSINESS",
  status: "PENDING", // 기본값: 승인대기
  phoneVerified: false,
  isMarketing: false,
  role: "BUSINESS",

  // BusinessInfo 정보
  businessRegistrationNum: "",
  corporationName: "",
  ceoName: "",
  businessType: "",
  businessAddress: "",
  businessAddressDetail: "", // 사업장 상세 주소
  businessRegistrationCert: "",
  faxNumber: "",
  faxSettings: "AUTO", // 기본값
  smsSettings: "AUTO", // 기본값
  businessHours: "",

  // AccountInfo 정보
  accountNumber: "",
  virtualAccount: "",
  bankAccountCopy: "",

  // DeliverySetting 정보
  deliveryAreaInfo: "",
  memberActualAddress: "",
  memberActualAddressDetail: "", // 실제 주소 상세
  mainPhoneNumber: "",
  mainMobileNumber: "",
  autoProductRegister: false,
  handleFruitProducts: false,
  handleCondolenceBasket: false,
  expressDeliveryAvailable: false,
  handleRoundFlowerArrangement: false,
  blackGoldRibbonAvailable: false,
  handleLargeExtraLarge: false,
  handle4_5Tier: false,
  handleBonsa: false,
  holidayDeliveryAvailable: false,
  nightDeliveryAvailable: false,
};
