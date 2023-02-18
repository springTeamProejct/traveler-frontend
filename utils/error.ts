export const ErrorDefinition = {
  J00: {
    status: 409,
    message: "이미 가입된 회원입니다.",
    note: "email",
  },
  J01: {
    status: 409,
    message: "이미 가입된 회원입니다.",
    note: {
      type: "phone",
      setIsUser: "isUser",
    },
  },
  J02: {
    status: 409,
    message: "잘못된 이메일 형식입니다.",
  },
  J03: {
    status: 409,
    message: "잘못된 비밀번호 형식입니다.",
  },
  J04: {
    status: 409,
    message: "인증번호가 틀렸습니다.",
    note: {
      Comment:
        "인증번호 불일치 또는 시간초과 이지만 시간초과에 대한 유효성은 프론트에서 관리하기 때문에 인증번호가 틀린 것만 해당하도록 한다.",
      setIsUser: false,
    },
  },
};
