export const data = {
  catégories: {
    boissons: {
      "bubble tea": {
        tailles: [
          { taille: "Petit", prix: "5€" },
          { taille: "Moyen", prix: "6€" },
          { taille: "Grand", prix: "7€" },
        ],
        température: ["Chaud", "Froid"],
        "taux de sucre": ["Faible", "Moyen", "Elevé"],
        filtres: ["Fruits", "Lait"],
        produits: [
          {
            id: 1,
            type: "Fruits",
            image: require("../assets/img/coco-strawberry-latte.png"),
            nom: "Bubble Tea Fraise",
            description: "C'est délicieux!",
            thé: ["Vert", "Noir"],
            bulles: ["Tapioca", "Litchi", "Aucune"],
            allergènes: ["Bla bla bla"],
            extras: [
              {
                nom: "",
                prix: "",
              },
            ],
          },
          {
            id: 2,
            type: "Fruits",
            image: require("../assets/img/coco-strawberry-latte.png"),
            nom: "Bubble Tea Mangue",
            description: "Si doux!",
            thé: ["Vert", "Noir"],
            bulles: ["Tapioca", "Litchi", "Aucune"],
            allergènes: ["Bla bla bla"],
            extras: [
              {
                nom: "",
                prix: "",
              },
            ],
          },
          {
            id: 3,
            type: "Lait",
            "type de lait": ["Amande", "Avoine", "Soja"],
            image: require("../assets/img/coco-strawberry-latte.png"),
            nom: "Bubble Tea Brown Sugar",
            description: "Le préféré du staff!",
            thé: ["Vert", "Noir"],
            bulles: ["Tapioca", "Litchi", "Aucune"],
            allergènes: ["Bla bla bla"],
            extras: [
              {
                nom: "",
                prix: "",
              },
            ],
          },
        ],
      },
    },
    nourriture: {
      "banh mi": {
        "sauce piquante": ["Oui", "Non"],
        filtres: ["Végé", "Poulet", "Boeuf"],
        produits: [
          {
            id: 4,
            type: "Poulet",
            image: require("../assets/img/banhmi-viande.png"),
            nom: "Banh Mi Poulet",
            description: "Best seller!",
            prix: "3€",
            légumes: ["Concombre", "Carotte", "Coriandre"],
            allergènes: ["Bla bla bla"],
            régime: ["Halal", "Vegan"],
          },
        ],
      },
      wraps: {
        "sauce piquante": ["Oui", "Non"],
        filtres: ["Végé", "Poulet", "Boeuf"],
        produits: [
          {
            id: 5,
            type: "Poulet",
            image: require("../assets/img/banhmi-viande.png"),
            nom: "Wrap Poulet",
            description: "Basic!",
            prix: "3€",
            légumes: ["Concombre", "Carotte", "Coriandre", "Oignon rouge"],
            allergènes: ["Bla bla bla"],
            régime: ["Halal", "Vegan"],
          },
          {
            id: 6,
            type: "Boeuf",
            image: require("../assets/img/banhmi-viande.png"),
            nom: "Wrap Boeuf",
            description: "Louurd!",
            prix: "3€",
            légumes: ["Concombre", "Carotte", "Coriandre", "Oignon rouge"],
            allergènes: ["Bla bla bla"],
            régime: ["Halal", "Vegan"],
          },
          {
            id: 7,
            type: "Végé",
            image: require("../assets/img/banhmi-viande.png"),
            nom: "Wrap Végé",
            description: "Basic!",
            prix: "3€",
            légumes: ["Concombre", "Carotte", "Coriandre", "Oignon rouge"],
            allergènes: ["Bla bla bla"],
            régime: ["Halal", "Vegan"],
          },
        ],
      },
    },
  },
};
