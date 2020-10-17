import React, { Component } from 'react';
import '../styles/form.style.css';

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: '', 
            dificulty: '',
            type: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.getQuestions(this.state.category, this.state.dificulty, this.state.type);

        // three of them must be chosen

        if(!(this.state.category || (this.state.dificulty && this.state.type))){
            alert('Please Choose Category');

        // dificulty and type must be chosen

        } else if (this.state.category && !(this.state.dificulty && this.state.type)){
            alert('Please Choose Dificulty and Type');
        }
    }
    render(){
        const { type, dificulty, category } = this.state;
        return (
                <form className='form' onSubmit={this.handleSubmit}>
                    <label htmlFor='category'>Choose Category:</label>
                    <select value={category} id='category' name='category' onChange={this.handleChange}>
                        <option value=''>Any Category</option>
                        <option value={9}>General Knowledge</option>
                        <option value={10}>Entertainment: Books</option>
                        <option value={11}>Entertainment: Film</option>
                        <option value={12}>Entertainment: Music</option>
                        <option value={13}>Entertainment: Musical & Theatre</option>
                        <option value={14}>Entertainment: Television</option>
                        <option value={15}>Entertainment: Video Games</option>
                        <option value={16}>Entertainment: Board Games</option>
                        <option value={17}>Science & Nature</option>
                        <option value={18}>Science: Computers</option>
                        <option value={19}>Science: Mathematics</option>
                        <option value={20}>Mythology</option>
                        <option value={21}>Sports</option>
                        <option value={22}>Geograpy</option>
                        <option value={23}>History</option>
                        <option value={24}>Politics</option>
                        <option value={25}>Art</option>
                        <option value={26}>Celebrities</option>
                        <option value={27}>Animals</option>
                        <option value={28}>Vehicles</option>
                        <option value={29}>Entertainment: Comics</option>
                        <option value={30}>Science: Gadgets</option>
                        <option value={31}>Entertainment: Japanese Anime & Manga</option>
                        <option value={32}>Entertainment: Cartoon & Animations</option>
                    </select>
                    <label htmlFor='dificulty'>Choose Dificulty :</label>
                    <select value={dificulty} id='dificulty' name='dificulty' onChange={this.handleChange}>
                        <option></option>
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                    </select>
                    <label htmlFor='type'>Select Type :</label>
                    <select value={type} id='type' name='type' onChange={this.handleChange}>
                        <option></option>
                        <option value='multiple'>Multiple Choise</option>
                        <option value='boolean'>True / false</option>
                    </select>
                    <button className='form-btn'>Get Questions</button>
                </form>
        )
    }
}

export default Form;