import Dashboard from '../components/dashboard'

// Widgets
import DateTime from '../components/widgets/datetime'
import PageSpeedInsightsScore from '../components/widgets/pagespeed-insights/score'
import PageSpeedInsightsStats from '../components/widgets/pagespeed-insights/stats'
import JiraIssueCount from '../components/widgets/jira/issue-count'
import GitHubIssueCount from '../components/widgets/github/issue-count'
import GitHubPullRequests from '../components/widgets/github/pull-requests'
import GitHubPRInfo from '../components/widgets/github/pull-request-info'
import GitHubEmojiCount from '../components/widgets/github/emoji-count'
// import SonarQube from '../components/widgets/sonarqube'
// import JenkinsJobStatus from '../components/widgets/jenkins/job-status'
// import JenkinsJobHealth from '../components/widgets/jenkins/job-health'
// import JenkinsBuildDuration from '../components/widgets/jenkins/build-duration'
// import ElasticsearchHitCount from '../components/widgets/elasticsearch/hit-count'

// Theme
// import lightTheme from '../styles/light-theme'
import darkTheme from '../styles/dark-theme'
import 'react-accessible-accordion/dist/fancy-example.css'

import styled from 'styled-components'

const Half = styled.div`
	width: 50%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`

export default () => (
	<Dashboard theme={darkTheme}>
		<Half>
			<PageSpeedInsightsScore url="https://google.com" />

			<PageSpeedInsightsStats url="https://google.com" />

			<GitHubEmojiCount owner="johnnyduong" repository="dashboard" />

			<GitHubIssueCount owner="node-gh" repository="gh" />
		</Half>

		<Half>
			<GitHubPRInfo />
		</Half>

		{/* <SonarQube
			url="https://crossorigin.me/https://sonarcloud.io"
			componentKey="com.icegreen:greenmail-parent"
		/>

		<JenkinsJobStatus
			url="https://crossorigin.me/https://builds.apache.org"
			jobs={[
				{ label: 'JMeter', path: 'JMeter-trunk' },
				{
					label: 'Log4j Kotlin',
					path: 'Log4jKotlin',
					branch: 'master',
				},
			]}
		/>

		<JenkinsJobHealth
			url="https://crossorigin.me/https://builds.apache.org"
			jobs={[
				{ label: 'JMeter', path: 'JMeter-trunk' },
				{
					label: 'Log4j Kotlin',
					path: 'Log4jKotlin',
					branch: 'master',
				},
			]}
		/>

		<JenkinsBuildDuration
			url="https://crossorigin.me/https://builds.apache.org"
			jobs={[
				{ label: 'JMeter', path: 'JMeter-trunk' },
				{
					label: 'Log4j Kotlin',
					path: 'Log4jKotlin',
					branch: 'master',
				},
			]}
		/>

		<ElasticsearchHitCount
			title="Log Hits"
			url="https://crossorigin.me/http://ec2-34-210-144-223.us-west-2.compute.amazonaws.com:9200"
			index="blog"
			query="user:dilbert"
		/> */}
	</Dashboard>
)
