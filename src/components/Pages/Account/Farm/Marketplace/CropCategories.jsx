import React, { useState, useEffect } from "react"

const cats = [
  "Grains",
  "Oil",
  "Root vegetables",
  "Soft fruits",
  "Vegetables",
  "Other",
]

const CropCategories = (props) => {
  const [selected, setSelected] = useState("Grains")

  return (
    <section>
      <article className="flex" style={{ justifyContent: "space-evenly" }}>
        {cats.map((cat) => (
          <div key={cat}>
            <img
              src={require(`./Crop Images/${cat}.png`).default}
              alt={cat}
              height={50}
              width={50}
              className={selected == cat ? "crop-selected" : ""}
              onClick={(e) => {
                console.log(cat)
                setSelected(cat)
                props.onClick(cat)
              }}
            />
            <p className="center">{cat}</p>
          </div>
        ))}
      </article>
    </section>
  )
}

export default CropCategories
