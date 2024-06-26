export const nameSubs = (name) => {
  // İsmi ve soyadı ayırmak için boşluk karakterine göre bölüyoruz
  const nameParts = name?.split(" ");

  // İlk ismin ilk harfi ve son ismin ilk harfini alıyoruz
  const firstNameInitial = nameParts[0][0];
  const lastNameInitial = nameParts[nameParts.length - 1][0];

  // Sonucu döndürüyoruz
  return firstNameInitial + lastNameInitial;
};
