export interface CaptchaModel {
  captchaBase64Data: string;
  salt: string;
  hashedCaptcha: string;
}
