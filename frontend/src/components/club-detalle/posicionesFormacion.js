const getPosiciones = (esquema) => {
  switch (esquema) {
    case "4-3-3":
      return [
        { label: "ARQ", top: "85%", left: "50%" },
        { label: "DEF", top: "60%", left: "80%" },
        { label: "DEF", top: "65%", left: "40%" },
        { label: "DEF", top: "65%", left: "60%" },
        { label: "DEF", top: "60%", left: "15%" },
        { label: "MED", top: "35%", left: "30%" },
        { label: "MED", top: "45%", left: "50%" },
        { label: "MED", top: "35%", left: "70%" },
        { label: "DEL", top: "15%", left: "23%" },
        { label: "DEL", top: "10%", left: "50%" },
        { label: "DEL", top: "15%", left: "77%" }
      ];
    case "4-4-2":
      return [
        { label: "ARQ", top: "85%", left: "50%" },
        { label: "DEF", top: "60%", left: "80%" },
        { label: "DEF", top: "65%", left: "40%" },
        { label: "DEF", top: "65%", left: "60%" },
        { label: "DEF", top: "60%", left: "15%" },
        { label: "MED", top: "30%", left: "17%" },
        { label: "MED", top: "40%", left: "35%" },
        { label: "MED", top: "40%", left: "65%" },
        { label: "MED", top: "30%", left: "83%" },
        { label: "DEL", top: "10%", left: "35%" },
        { label: "DEL", top: "10%", left: "65%" }
      ];
    case "3-5-2":
      return [
        { label: "ARQ", top: "85%", left: "50%" },
        { label: "DEF", top: "65%", left: "25%" },
        { label: "DEF", top: "70%", left: "50%" },
        { label: "DEF", top: "65%", left: "75%" },
        { label: "MED", top: "35%", left: "18%" },
        { label: "MED", top: "40%", left: "35%" },
        { label: "MED", top: "50%", left: "50%" },
        { label: "MED", top: "40%", left: "65%" },
        { label: "MED", top: "35%", left: "82%" },
        { label: "DEL", top: "10%", left: "40%" },
        { label: "DEL", top: "10%", left: "60%" }
      ];

    case "4-2-3-1":
      return [
        { label: "ARQ", top: "85%", left: "50%" },
        { label: "DEF", top: "65%", left: "20%" },
        { label: "DEF", top: "70%", left: "40%" },
        { label: "DEF", top: "70%", left: "60%" },
        { label: "DEF", top: "65%", left: "80%" },
        { label: "MED", top: "50%", left: "35%" },
        { label: "MED", top: "50%", left: "65%" },
        { label: "MED", top: "30%", left: "20%" },
        { label: "MED", top: "30%", left: "50%" },
        { label: "MED", top: "30%", left: "80%" },
        { label: "DEL", top: "10%", left: "50%" }
      ];

    case "5-3-2":
      return [
        { label: "ARQ", top: "85%", left: "50%" },
        { label: "DEF", top: "60%", left: "15%" },
        { label: "DEF", top: "70%", left: "30%" },
        { label: "DEF", top: "70%", left: "50%" },
        { label: "DEF", top: "70%", left: "70%" },
        { label: "DEF", top: "60%", left: "85%" },
        { label: "MED", top: "35%", left: "30%" },
        { label: "MED", top: "45%", left: "50%" },
        { label: "MED", top: "35%", left: "70%" },
        { label: "DEL", top: "10%", left: "40%" },
        { label: "DEL", top: "10%", left: "60%" }
      ];

    case "4-1-4-1":
      return [
        { label: "ARQ", top: "85%", left: "50%" },
        { label: "DEF", top: "65%", left: "20%" },
        { label: "DEF", top: "70%", left: "40%" },
        { label: "DEF", top: "70%", left: "60%" },
        { label: "DEF", top: "65%", left: "80%" },
        { label: "MED", top: "50%", left: "50%" },
        { label: "MED", top: "30%", left: "20%" },
        { label: "MED", top: "35%", left: "40%" },
        { label: "MED", top: "35%", left: "60%" },
        { label: "MED", top: "30%", left: "80%" },
        { label: "DEL", top: "10%", left: "50%" }
      ];
    default:
      return [];
  }
};

export default getPosiciones;
