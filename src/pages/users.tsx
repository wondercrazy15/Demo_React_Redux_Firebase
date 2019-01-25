import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, Route, Switch } from 'react-router-dom'

import UsersIndexPage from './users/index'
import ShowUsersPage from './users/show'

import { ApplicationState, ConnectedReduxProps } from '../store'


interface PropsFromState {
  loading: boolean
  errors?: string
}


type AllProps = PropsFromState & RouteComponentProps<{}> & ConnectedReduxProps

class UsersPage extends React.Component<AllProps> {
  public render() {
    const { match } = this.props

    return (
      <Switch>
        <Route exact path={match.path + '/'} component={UsersIndexPage} />
        <Route path={match.path + '/:id'} component={ShowUsersPage} />
      </Switch>
    )
  }
}

const mapStateToProps = ({ users }: ApplicationState) => ({
  loading: users.loading,
  errors: users.errors
})
export default connect(mapStateToProps)(UsersPage)
