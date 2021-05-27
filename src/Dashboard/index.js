import React from 'react'
import faker from 'faker'
import AppContext from '../context'

import './style.css'

const generateTableData = (count = 0) => {
    return Array.from({ length: count }).map(() => ({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        avatar: faker.internet.avatar()
    }))
}

export default class Dashboard extends React.Component {
    static contextType = AppContext;
    componentDidMount() {
        const data = generateTableData(20)
        this.setState({ items: data })
    }
    render() {
        return (
            <div className="Dashboard">
                <header>
                    <span>{this.context.user?.login}</span>
                    <button className="btn" type="button" onClick={() => this.context.setUser(null)}>Logout</button>
                </header>
                <section>
                    <table className="DashboardTable" cellPadding="10px">
                        <thead>
                            <tr>
                                <td>Avatar</td>
                                <td>Name</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state?.items && this.state.items.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <img className="DashboardAvatar" alt={item.name} src={item.avatar} />
                                    </td>
                                    <td>{item.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        );
    }
}