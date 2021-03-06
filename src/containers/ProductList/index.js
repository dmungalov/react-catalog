import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductCard from '../ProductCard'
import './style.css'

class ProductList extends Component {

    render() {
        const fetching = this.props.fetching;
        const error = this.props.error;
        const listView = this.props.viewList;
        let data = this.props.list;
        let products = [];
        products = data.map((item, id) => {
            return (
                <ProductCard
                    key={id}
                    data={item}
                    view={listView}/>
            )
        });

        return (
            <div className={`product-list__wrapper ${ fetching ? 'product-list__wrapper_fetching' : '' }`}>
                <img
                    className={`product-list__loader ${ fetching ? '' : 'hidden' }`}
                    src="/loader.gif"
                    alt="loading..."/>
                <p
                    className={`error ${ error ? '' : 'hidden' }`}>
                    Нихуя не загрузилось, смотрите на старые товары</p>
                <div className="product-list">{products}</div>
            </div>
        )
    }

    // Filtering and sorting data
    magic (rawData) {
        const filterText = this.props.settings.filter.text
        const sortSettings = this.props.settings.sort 
        
        const filteredData = filterData(rawData, filterText)
        const data = sortingData(filteredData, sortSettings)

        function filterData(data, filterText) {
            let filteredData = []
            data.forEach((product) => {
                if (product.title.indexOf(filterText) === -1) {
                    return
                }
                filteredData.push(product)
            })
            return filteredData
        }
        function sortingData(data, sortSettings) {
            const id = sortSettings.id
            const abc = sortSettings.abc
            const price = sortSettings.price
            const direction = sortSettings.direction 
            let sorted = data
    
            if (id) {
                sorted.sort(compareId)
            }
            else if (abc) {
                sorted.sort(compareABC)
            }
            else if (price) {
                sorted.sort(comparePrice)
            }
    
            function compareId(a, b) {
                if (a.id > b.id) return direction;
                if (a.id < b.id) return -direction;
            }
            function compareABC(a, b) {
                if (a.title > b.title) return direction;
                if (a.title < b.title) return -direction;
            }
            function comparePrice(a, b) {
                if (a.userId > b.userId) return direction;
                if (a.userId < b.userId) return -direction;
            }
    
            return sorted
        }

        return data
    }
}
function mapStateToProps (state) {
  return {
      list: state.app.data,
      fetching: state.app.fetching,
      error: state.app.error,
      settings: state.app.settings,
      viewList: state.app.viewList
  }
}
export default connect(mapStateToProps)(ProductList)