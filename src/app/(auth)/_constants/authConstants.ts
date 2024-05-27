export const PLACEHOLDER = {
  email: '이메일을 입력해 주세요.',
  password: '비밀번호를 입력해 주세요.',
  nickname: '닉네임을 입력해 주세요.',
  password_signup: '8자 이상 입력해 주세요.',
  password_check: '비밀번호를 한번 더 입력해 주세요.',
}

interface MessageType {
  [key: string]: {
    message: string
    link: string
    path: string
  }
}

export const DIRECT_LINK: MessageType = {
  '/login': {
    message: '최애의 포토가 처음이신가요?',
    link: '회원가입하기',
    path: '/signup',
  },
  '/signup': {
    message: '이미 최애의 포토 회원이신가요?',
    link: '로그인하기',
    path: '/login',
  },
}

export const ERROR_MESSAGE = {
  emailRequired: '이메일을 입력해 주세요.',
  emailInvalid: '이메일 형식이 아닙니다.',
  emailCheck: '이메일을 확인해 주세요.',
  emailOccupied: '이미 사용중인 이메일입니다.',

  passwordRequired: '비밀번호를 입력해 주세요.',
  loginPasswordInvalid: '8자 이상 입력해 주세요.',
  signupPasswordInvalid: '영문, 숫자를 조합해 8자 이상 입력해 주세요.',
  passwordCheck: '비밀번호를 확인해 주세요.',

  confirmPasswordRequired: '비밀번호 확인을 입력해 주세요.',
  confirmPasswordCheck: '비밀번호가 일치하지 않습니다.',

  nicknameRequired: '닉네임을 입력해 주세요.',
  nicknameInvalid: '닉네임은 10자를 초과할 수 없습니다.',
  nicknameOccupied: '이미 사용중인 닉네임입니다.',
}

export const EMAIL_RULES = {
  required: ERROR_MESSAGE.emailRequired,
  pattern: { value: /\S+@\S+\.\S+/, message: ERROR_MESSAGE.emailInvalid },
}

export const LOGIN_PASSWORD_RULES = {
  required: ERROR_MESSAGE.passwordRequired,
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
    message: ERROR_MESSAGE.loginPasswordInvalid,
  },
}

export const SIGNUP_PASSWORD_RULES = {
  required: ERROR_MESSAGE.passwordRequired,
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
    message: ERROR_MESSAGE.signupPasswordInvalid,
  },
}

export const NICKNAME_RULES = {
  required: ERROR_MESSAGE.nicknameRequired,
  maxLength: { value: 10, message: ERROR_MESSAGE.nicknameInvalid },
}
