// the canonical list of skills
// in Pokemon terms, this is the full list of all skills for all Pokemon
// while each individual Pokemon has up to 4 of these
module.exports = [
  {
    catergoryName: "Scratching",
    behaviors: [
      {
        behavior: "scratches you.",
        min: 0,
        max: 50,
        next: 40
      },
      {
        behavior: "scratches the wall.",
        prev: 50,
        min:40,
        max: 80,
        next: 65
      },
      {
        behavior: "scratches the scratching post.",
        prev: 80,
        min: 65,
        max: 100
      }
    ]
  },
  {
    catergoryName: "Acrobatics",
    behaviors: [
      {
        behavior: "blinks at you.",
        min: 0,
        max: 30,
        next: 20
      },
      {
        behavior: "stretches lazily.",
        prev: 30,
        min: 20,
        max: 60,
        next: 50
      },
      {
        behavior: "pounces!",
        prev: 60,
        min: 50,
        max: 90,
        next: 70
      },
      {
        behavior: "does a flip!",
        prev: 90,
        min: 70,
        max: 100
      }
    ]
  },
  {
    catergoryName: "Litter Box",
    behaviors: [
      {
        behavior: "makes a mess.",
        min: 0,
        max: 70,
        next: 30
      },
      {
        behavior: "uses the litter box.",
        prev: 70,
        min: 30,
        max: 100
      }
    ]
  }
];
