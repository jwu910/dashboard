import { Component } from 'react'
import Widget from '../../widget'
import Counter from '../../counter'
import axios from 'axios'

export default class JiraIssueCount extends Component {
	static defaultProps = {
		interval: 1000 * 60 * 5,
		title: 'JIRA Issue Count',
	}

	state = {
		count: 0,
		error: false,
		loading: true,
	}

	componentDidMount() {
		this.fetchInformation()
	}

	async fetchInformation() {
		const { data } = await axios.get(
			'http://localhost:3001/api/jira?query=latest/issue/LWM-696'
		)

		console.log('data', data)

		this.setState({ count: data.id, loading: false })
	}

	render() {
		const { count, error, loading } = this.state
		const { title } = this.props
		return (
			<Widget title={title} loading={loading} error={error}>
				<Counter value={count} />
			</Widget>
		)
	}
}
