import React from "react"

const cats = [
  "Grains",
  "Oil",
  "Other",
  "Root vegetables",
  "Soft fruits",
  "Vegetables",
]

const CropCategories = (props) => {
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
              onClick={(e) => {
                console.log(cat)
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
