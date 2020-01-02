import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {Spinner} from '../../components';
import style from './style';

import ListPersonnel from './ListPersonnel';
import AddPersonnel from './AddPersonnel'

const endpoint = "http://localhost:4000/api";

class Personnel extends React.Component {
    state={
        toggle : false,
        data : [],
        loading : false,
        redirect : false
    }

    async UNSAFE_componentWillMount(){
        this.setState({loading:true});
        await axios.get(endpoint+'/user', this.props.configHeader)
        .then(res=>{
            if(res.data.status === 200){
                this.setState({data:res.data.row, loading:false})
            }else{
                this.setState({loading : false, redirect : true});
            }
        })
        .catch(err=>null);
    }

    render(){
        const {classes, configHeader} = this.props; 
        const {toggle, loading, data, redirect} = this.state;
        return(
            <React.Fragment>
                {loading && <Spinner />}
                {redirect && <Redirect to="logout" />}
                {toggle?
                <AddPersonnel
                classes={classes}
                setData={e=>this.setState({data:e})}
                setToggle={e=>this.setState({toggle:e})} 
                endpoint={endpoint}
                setLoading={e=>this.setState({loading:e})}
                configHeader={configHeader}
                redirect={e=>this.setState({redirect:e})}
                />
                :
                <ListPersonnel
                classes={classes}
                setData={e=>this.setState({data:e})}
                data={data}
                setToggle={e=>this.setState({toggle:e})}
                endpoint={endpoint}
                setLoading={e=>this.setState({loading:e})}
                configHeader={configHeader}
                redirect={e=>this.setState({redirect:e})}
                />
                }
            </React.Fragment>
        );
    }
}

export default style(Personnel);