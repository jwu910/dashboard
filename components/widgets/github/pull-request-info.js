import client from './client'
import Counter from '../../counter'
import twas from 'twas'
import Widget from '../../widget'
import { basicAuthHeader } from '../../../lib/auth'
import { Component } from 'react'
import { object, string, number } from 'yup'

export default class GitHubPRInfo extends Component {
  static defaultProps = {
    title: 'GitHub PRs',
  }

  state = {
    data: {
      pullRequests: [],
      repository: null
    },
    error: false,
    loading: true,
  }

  componentDidMount() {
    this.fetchInformation()
  }

  async fetchInformation() {
    try {
      const res = await client.request(`
        {
          repository(owner: "node-gh", name: "gh") {
            description
            name
            pullRequests(first: 100, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
              nodes {
                additions
                author {
                  login
                  url
                  avatarUrl
                }
                changedFiles
                comments(first: 100) {
                  edges {
                    node {
                      author {
                        login
                      }
                      id
                      url
                    }
                  }
                }
                createdAt
                deletions
                id
                mergeable
                number
                title
                updatedAt
                url
              }
            }
            url
          }
        }
      `)

      this.setState({
        data: {
          pullRequests: res.repository.pullRequests.nodes,
          repository: res.repository
        },
        error: false,
        loading: false,
      })
    } catch (error) {
      this.setState({ error: true, loading: false })
    }
  }

  render() {
    const { data, error, loading } = this.state
    const { title } = this.props

    return (
      <React.Fragment>
        {data.pullRequests && data.repository && (
          <div>
            <h1>
              Github PRs
            </h1>

            <h2 style={{textTransform: 'uppercase'}}>
              <a href={data.repository.url} style={{color: '#0B5FFF', textDecoration: 'none'}} target="_blank">{data.repository.name}</a>
            </h2>

            <h4>
               {data.repository.description}
            </h4>

            <div>
              <h5>
                Open PRs:
              </h5>

              {data.pullRequests.map((pullRequest) => (
                <div key={pullRequest.id} style={{border: '1px solid #FF69B4', borderRadius: '4px', marginBottom: '24px', padding: '0 12px'}}>
                  <h5 style={{alignItems: 'center', display: 'flex'}}>
                    <a href={pullRequest.author.url} style={{color: '#0B5FFF', textDecoration: 'none'}} target="_blank">
                      <img src={pullRequest.author.avatarUrl} style={{borderRadius: '40px', height: '64px', width: '64px'}} title={pullRequest.author.login} />
                    </a>

                    <a href={pullRequest.url} style={{color: '#0B5FFF', marginLeft: '12px', textDecoration: 'none'}} target="_blank">#{pullRequest.number} - {pullRequest.title}</a>
                  </h5>

                  <span style={{color: '#71A2FF'}}>Opened:</span> {twas(new Date(pullRequest.createdAt))}

                  <br />
                  <br />

                  <span style={{color: '#71A2FF'}}>Last updated:</span> {twas(new Date(pullRequest.updatedAt))}

                  <br />
                  <br />

                  <span style={{color: '#71A2FF'}}>Mergable:</span> {pullRequest.mergeable == 'MERGEABLE' ? (<span style={{border: '1px solid #5ACA76', borderRadius: '4px', color: '#5ACA76', padding: '4px'}}>{pullRequest.mergeable}</span>) : (<span style={{border: '1px solid #FF8F39', borderRadius: '4px', color: '#FF8F39', padding: '4px'}}>{pullRequest.mergeable}</span>)}

                  <br />
                  <br />

                  <span style={{border: '1px solid #B3CDFF', borderRadius: '4px', color: '#B3CDFF', fontSize: '14px', padding: '4px'}}>Files Changed: {pullRequest.changedFiles}</span> <span style={{border: '1px solid #5ACA76', borderRadius: '4px', color: '#5ACA76', fontSize: '14px', padding: '4px'}}>Additions: {pullRequest.additions}</span> <span style={{border: '1px solid #F48989', borderRadius: '4px', color: '#F48989', fontSize: '14px', padding: '4px'}}>Deletions: {pullRequest.deletions}</span>

                  <br />
                  <br />
                </div>
              ))}
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}
