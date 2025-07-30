//FormInputs, RequestDto, ResponseDto
type RegisterFormInputs = {
  // 1. 기본 회원 정보
  loginId: string; // 아이디
  password: string; // 비밀번호
  passwordConfirm: string;
  name: string; // 이름
  nickname: string; //게시판 닉네임
  mobile: string; // 전화번호
  bankCertFile: File; // 통장사본 File
  businessCertFile: File; //사업자등록증 File

  // 2. 활동 지역
  activityRegions: {
    sido: string;
    sigungu: string;
    full: string;
  };

  // 3. 배송지역설정
  productPrices: {
    sido: string;
    sigungu: string;
    categoryName: string;
    price: number;
    isAvailable: boolean;
  }[];

  // 4. 사업자 프로필
  businessProfile: {
    businessNumber: string; // 사업자등록번호
    corpName: string; // 상호명
    ceoName: string; // 대표자명
    businessType: string; // 업태
    businessItem: string; //종목
    companyAddress: string; // 사업장 주소
    fax: string; // 팩스번호
    bankName: string;
    accountNumber: string;
    accountOwner: string;
    officeAddress: {
      sido: string;
      sigungu: string;
      zipcode: string;
      base: string;
      detail: string;
    };
  };

  // 5. 추가 정보
  deliveryAreaInfo: string; // 배송 가능 지역
  memberActualAddress: string; // 실제 주소
  memberActualAddressDetail: string; //실제주소상세 *
  memberActualPostalCode: string; //우편번호 *
  memberActualCity: string; //시도 *
  memberActualState: string; //시군구 *
  mainPhoneNumber: string; // 대표 전화번호
  mainMobileNumber: string; // 대표 휴대폰번호
  autoProductRegister: boolean; // 상품 자동 등록 여부
  handleFruitProducts: boolean; // 과일 취급 여부
  handleCondolenceBasket: boolean; // 근조바구니 취급 여부
  expressDeliveryAvailable: boolean; // 퀵배송 가능 여부
  handleRoundFlowerArrangement: boolean; // 원형화환 취급 여부
  blackGoldRibbonAvailable: boolean; // 검정/금색 리본 가능 여부
  handleLargeExtraLarge: boolean; // 대/특대 취급 여부
  handle4_5Tier: boolean; // 4단/5단 취급 여부
  handleBonsa: boolean; // 분재 취급 여부
  holidayDeliveryAvailable: boolean; // 공휴일 배송 가능 여부
  nightDeliveryAvailable: boolean; // 야간 배송 가능 여부
};
