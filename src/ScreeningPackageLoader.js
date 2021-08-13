const packages_health_men_under40 = [
    // { price: 395 , text: "MEDISCREEN BASIC MOT" },
    { price: 595 , text: "HEALTH BASICS MOT" },
    { price: 895 , text: "HEALTH ADVANCED MOT" },
    { price: 1299 , text: "HEALTH ELITE MOT" },
    // { price: 525 , text: "MEDISCREEN SEXUAL HEALTH MOT" },
  ]

  const packages_health_men_over40 = [
    { price: 795 , text: "MEN'S HEALTH BASICS MOT" },
    { price: 995 , text: "MEN'S HEALTH ADVANCED MOT" },
    { price: 1999 , text: "MEN'S HEALTH ELITE MOT" },
    // { price: 3999 , text: "PLATINIUM HEALTH SCREEN MEN" },
    // { price: 525 , text: "MEDISCREEN SEXUAL HEALTH MOT" },
  ]

  const packages_health_women_under40 = [
    // { price: 395 , text: "MEDISCREEN BASIC MOT" },
    { price: 595 , text: "WOMEN'S HEALTH BASICS MOT" },
    { price: 895 , text: "WOMEN'S HEALTH ADVANCED MOT" },
    { price: 1999 , text: "WOMEN'S HEALTH ELITE MOT" },
    // { price: 525 , text: "MEDISCREEN SEXUAL HEALTH MOT" },
  ]

  const packages_health_women_over40 = [
    { price: 795 , text: "HEALTH BASICS MOT" },
    { price: 1099 , text: "HEALTH ADVANCED MOT" },
    { price: 1499 , text: "HEALTH ADVANCED PLUS MOT" },
    { price: 2499 , text: "HEALTH ELITE MOT" },
    // { price: 525 , text: "MEDISCREEN SEXUAL HEALTH MOT" },
  ]

  const packages_allergy = [
    { price: 999 , text: "ALLERGY BASICS MOT PACKAGE" },
    { price: 1499 , text: "ALLERGY ADVANCED MOT PACKAGE" },
  ]

  export const categories = [
    { key: "health", text: "HEALTH SCREEENING" },
    { key: "occupational", text: "OCCUPATIONAL HEALTH / PRE EMPLOYMENT" },
    { key: "travel", text: "TRAVEL HEALTH & VACCINATION" },
    { key: "visa", text: "VISA MEDICAL" },
    { key: "allergy", text: "ALLERGY SCREEENING" },
    { key: "cancer", text: "CANCER SCREEENING" },
  ]

  export const getCatText = (key) => {
      const cat = categories.find(e => e.key === key)
      if (cat)
      {
          return cat.text
      }else
      {
          return ''
      }
  }


  export const getPackageByIndex = (index, state) =>
  {
    try{
        return loadPackages(state)[index-1]
    }catch(err)
    {
        return "not-defined"
    }
  }

  export const loadPackages = (state) => {
    if (state.cat?.key === "health")
    {
      if (state.gender === "men"){
        if (state.age === "under40"){
          return packages_health_men_under40
        }else if (state.age === "over40"){
          return packages_health_men_over40
        }
      }else if (state.gender === "women"){
        if (state.age === "under40"){
          return packages_health_women_under40
        }else if (state.age === "over40"){
          return packages_health_women_over40
        }
      }
    }else if (state.cat?.key === "allergy"){
      return packages_allergy
    }
    return []
  }
