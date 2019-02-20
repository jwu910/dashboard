import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import twas from 'twas'
import { object, string, number } from 'yup'
import Widget from '../../widget'
import auth from '../../../auth'
import Counter from '../../counter'
import ListItem from '../../list-item'
import List from '../../list'
import Link from '../../link'
import { basicAuthHeader } from '../../../lib/auth'
import client from './client'

const schema = object().shape({
	owner: string().required(),
	repository: string().required(),
	interval: number(),
	title: string(),
})

export default class GitHubPullRequests extends Component {
	static defaultProps = {
		interval: 1000 * 60 * 5,
		title: 'GitHub Pull Requests',
	}

	state = {
		error: false,
		loading: true,
		pullRequests: [],
	}

	componentDidMount() {
		schema
			.validate(this.props)
			.then(() => this.fetchInformation())
			.catch(err => {
				console.error(
					`${err.name} @ ${this.constructor.name}`,
					err.errors
				)
				this.setState({ error: true, loading: false })
			})
	}

	componentWillUnmount() {
		clearTimeout(this.timeout)
	}

	async fetchInformation() {
		const { owner, repository } = this.props

		try {
			const res = await client.request(`
        query {
          user(login: "${owner}") {
            name
            repository(name: "${repository}") {
              name
              pullRequests(first: 10, states: OPEN, orderBy: {direction: ASC, field: UPDATED_AT}) {
                edges {
                  node {
                    id
                    url
                    updatedAt
                    headRefOid
                    number
                    title
                    state
                    author {
                      login
                    }
                  }
                }
              }
            }
          }
        }
      `)

			const { pullRequests } = await res.user.repository

			const refs = pullRequests.edges.map(pr =>
				fetch(
					`https://api.github.com/repos/${owner}/${repository}/commits/${
						pr.node.headRefOid
					}/check-runs`,
					{
						headers: {
							Authorization: `Bearer ${auth.github.token}`,
							Accept:
								'application/vnd.github.antiope-preview+json',
						},
					}
				)
			)
			const checks = await Promise.all([...refs])

			this.setState({
				pullRequests: pullRequests.edges,
				error: false,
				loading: false,
			})
		} catch (error) {
			console.log(error)
			this.setState({ error: true, loading: false })
		} finally {
			this.timeout = setTimeout(
				() => this.fetchInformation(),
				this.props.interval
			)
		}
	}

	render() {
		const { error, loading, pullRequests } = this.state
		const { title } = this.props

		return (
			<Widget title={title} loading={loading} error={error}>
				{pullRequests && (
					<List>
						{pullRequests.map(
							({
								node: { id, number, url, author, updatedAt },
							}) => {
								return (
									<ListItem key={id}>
										<Link
											href={url}
											rel="noopener noreferrer"
											target="_blank"
										>
											{`${number} - ${
												author.login
											} - ${twas(
												new Date(`${updatedAt}`)
											)}`}
										</Link>
									</ListItem>
								)
							}
						)}
					</List>
				)}
			</Widget>
		)
	}
}
