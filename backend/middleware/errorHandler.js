// ErrorHandler sınıfı, hata işleme için özel bir hata sınıfıdır.
class ErrorHandler extends Error {
  // Constructor, hata mesajı ve durum kodu alır.
  constructor(message, statusCode) {
    // Hata sınıfının constructor'ını çağırarak hata mesajını ayarlar.
    super(message);
    // Hata için durum kodunu ayarlar.
    this.statusCode = statusCode;

    // Hata yığını bilgisini yeni bir hata nesnesinden alarak ayarlar.
    this.stack = new Error().stack;
  }
}

// ErrorHandler sınıfını varsayılan olarak dışa aktarır.
export default ErrorHandler;
