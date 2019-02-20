import Dashboard from '../components/dashboard'

// Widgets
import PageSpeedInsightsScore from '../components/widgets/pagespeed-insights/score'
import PageSpeedInsightsStats from '../components/widgets/pagespeed-insights/stats'
import GitHubIssueCount from '../components/widgets/github/issue-count'
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
import ReactChartkick, { GeoChart, Timeline } from 'react-chartkick'
import Chart from 'chart.js'
import styled from 'styled-components'

ReactChartkick.addAdapter(Chart)

const Half = styled.div`
	width: 50%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`

const ChartWrapper = styled.section`
	margin: 3rem 0;
	width: 97%;

	svg {
		background: white;
	}
`

export default () => (
	<Dashboard theme={darkTheme}>
		<Half>
			<PageSpeedInsightsScore url="https://google.com" />

			<PageSpeedInsightsStats url="https://google.com" />

			<GitHubEmojiCount owner="johnnyduong" repository="dashboard" />

			<GitHubIssueCount owner="node-gh" repository="gh" />

			<GitHubPullRequests owner="node-gh" repository="gh" />
		</Half>

		<Half>
			<GitHubPRInfo />
		</Half>

		<ChartWrapper>
			<h3>Live Site Usage</h3>

			<GeoChart
				adapter="google"
				data={[['United States', 44], ['Germany', 23], ['Brazil', 22]]}
			/>
		</ChartWrapper>

		<ChartWrapper>
			<h3>Sprint PR Time-To-Merge</h3>

			<Timeline
				data={[
					['Nav Bug Fix', '2018-01-29', '2018-02-10'],
					['Footer icons change', '2018-02-3', '2018-02-15'],
					['Perf improvement', '2018-01-18', '2018-03-3'],
					[
						'Marketing events landing page',
						'2018-02-15',
						'2018-03-2',
					],
					['Additional lang keys', '2018-02-3', '2018-02-4'],
				]}
			/>
		</ChartWrapper>

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
