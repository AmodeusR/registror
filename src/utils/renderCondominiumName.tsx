type userUidType = string | undefined;

const registeredCondominiums = {
  r4Gb9s7MuGgTWvHDTLGXwsNMZvI2: "Edifício Paraguaçu",
  LOSN99qxPKfBhNM4keh5TCtOG8q2: "Marisa"
}

export const renderCondominiumName = (userUid: userUidType) => {
    const isCondominiumNameAvailable = registeredCondominiums[userUid as keyof typeof registeredCondominiums];

  if (!isCondominiumNameAvailable) return "";
  
  return (
    <span className="header__condominium-name">
      Condomínio {registeredCondominiums[userUid as keyof typeof registeredCondominiums]}
    </span>
  );
};
