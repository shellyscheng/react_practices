import { useState } from 'react';
import './App.css';

function ProductCategoryRow({category}) {
  return (
    <tr className='category'>
      <th colspan="2">{category}</th>
    </tr>
  )
}

function ProductRow({product}) {
  return (
  <tr>
    <td className={product.stocked ? "" : "out-stocked"}>{product.name}</td> 
    <td>{product.price}</td>
  </tr> )
}

function ProductTable({data, inStockedOnly, searchTex}) {
  const row = []
  const filteredData = data.filter(el => el.name.toLowerCase().includes(searchTex.toLowerCase()))
  const categories = [...new Set(filteredData.map(el => el.category))]

  console.log("searchText", searchTex)

  categories.forEach(category => {
   row.push(<ProductCategoryRow category={category}/>)
   filteredData.forEach(product => {
    if (product.category === category) {
      if (inStockedOnly && !product.stocked) {
        return
      } 
      row.push(<ProductRow product={product}/>)
   }})
  })


  return(
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{row}</tbody>
      </table>
    </div>
  )
}

function SearchBar({setInStockedOnly, searchTex, setSearchText}) {
  return(
    <form>
        <input 
          type="text" 
          placeholder='Search...' 
          onChange={e => setSearchText(e.target.value)} 
          value={searchTex}/>
        <label>
          <input type="checkbox" onChange={() => setInStockedOnly(prevState => !prevState)}/> Only show products in stock
        </label>
    </form>
  )
}


function FilterableProductTable({data}) {
  const [inStockedOnly, setInStockedOnly] = useState(false)
  const [searchText, setSearchText] = useState("")
  
  return(
    <div>
      <SearchBar setInStockedOnly={setInStockedOnly} searchTex={searchText} setSearchText={setSearchText}/>
      <ProductTable data={data} searchTex={searchText} inStockedOnly={inStockedOnly}/>
    </div>
  )
}


function App() {

  return (<FilterableProductTable data={data}/>
    
    // <div className="App">
    //   <div className='filterable-head' >
    //     <input type="test" />
    //     <input type="checkbox" /> Only show products in stock
    //   </div>
    //   <div style={{display: "flex", justifyContent: "center"}}>
    //     <table className='table'>
    //       <tr>
    //         <th>Name</th>
    //         <th>Price</th>
    //       </tr>
    //       <tr>
    //         <td colspan="2"><b>{data[0].category}</b></td>
    //       </tr>
    //       {data.map(el => el.category === "Fruits" 
    //         ? <tr><td className={el.stocked ? "" : "out-stocked"}>{el.name}</td> 
    //           <td>{el.price}</td></tr> 
    //         : null)}
    //       <tr>
    //         <td colspan="2"><b>{data[3].category}</b></td>
    //       </tr>
    //       {data.map(el => el.category === "Vegetables" 
    //         ? <tr><td className={el.stocked ? "" 
    //         : "out-stocked"}>{el.name}</td> 
    //         <td>{el.price}</td></tr> 
    //         : null)}
    //     </table>
    //   </div>
      
    // </div>
  );
}

export default App;

const data = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]
