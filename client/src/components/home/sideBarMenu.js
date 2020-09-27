import React from 'react'
import {connect} from 'react-redux'
import  {getCategories} from '../../actions/categoryAction'

class CategoryMenu extends React.Component{

    componentDidMount () {
        this.props.dispatch(getCategories())
    }

    render(){
        return(
            <div className ='left__area'>
                

            </div>
        )
    }
}



const mapStateToProps = (state) =>{
    return {
        categories : state.categories
    }
}
export default connect(mapStateToProps)(CategoryMenu)