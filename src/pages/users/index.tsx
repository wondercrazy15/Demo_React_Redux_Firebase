import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState, ConnectedReduxProps } from '../../store';
import { User } from '../../store/users/types';
import { getAllUser } from '../../store/users/actions';
import { Dispatch } from 'redux';

import DataGrid, { Column, FilterRow, HeaderFilter, SearchPanel, Pager, Paging } from 'devextreme-react/data-grid';
import { SelectBox, CheckBox } from 'devextreme-react';
import '../users/styles.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.compact.css';

interface PropsFromState {
  loading: boolean
  data: User[]
  errors?: string
}

interface PropsFromDispatch {
  getAllUser: typeof getAllUser
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps

class UsersIndexPage extends React.Component<AllProps> {
  constructor(props) {
    super(props);
    this.applyFilterTypes = [{
      key: 'auto',
      name: 'Immediately'
    }, {
      key: 'onClick',
      name: 'On Button Click'
    }];

    this.state = {
      showFilterRow: true,
      showHeaderFilter: true,
      currentFilter: this.applyFilterTypes[0].key
    };

    this.dataGrid = null;
    this.orderHeaderFilter = this.orderHeaderFilter.bind(this);
    this.onShowFilterRowChanged = this.onShowFilterRowChanged.bind(this);
    this.onShowHeaderFilterChanged = this.onShowHeaderFilterChanged.bind(this);
    this.onCurrentFilterChanged = this.onCurrentFilterChanged.bind(this);
  }

  // Last Active date Expression filter
  calculateFilterExpression(value, selectedFilterOperations, target) {
    let column = this;
    if (target === 'headerFilter' && value === '') {
      return [[getOrderDay, '=', 0], 'or', [getOrderDay, '=', 6]];
    }
    return column.defaultCalculateFilterExpression.apply(this, arguments);
  }
  // Last Active date Header filter
  orderHeaderFilter(data: any) {
    data.dataSource.postProcess = (results: any) => {
      results.push({
        text: 'Weekends',
        value: 'weekends'
      });
      return results;
    };
  }
  // Change Row filter checkbox value
  onShowFilterRowChanged(e: any) {
    this.setState({
      showFilterRow: e.value
    });
    this.clearFilter();
  }
  // Change Header filter checkbox value
  onShowHeaderFilterChanged(e: any) {
    this.setState({
      showHeaderFilter: e.value
    });
    this.clearFilter();
  }
  // Change apply filter combobox value
  onCurrentFilterChanged(e: any) {
    this.setState({
      currentFilter: e.value
    });
  }
  clearFilter() {
    this.dataGrid.instance.clearFilter();
  }

  public componentDidMount() {
    const { data } = this.props
    if (data.length === 0) {
      this.props.getAllUser()
    }
  }

  public render() {
    const { data } = this.props;

    return (
      <div>
        <DataGrid id={'gridContainer'} ref={(ref) => this.dataGrid = ref}
          dataSource={data} showBorders={true}>
          {/* set Pagination */}
          <Paging defaultPageSize={5} />
          <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20]} showInfo={true} />
          {/* default display Row filter, Header filter & global search */}
          <FilterRow visible={this.state.showFilterRow} applyFilter={this.state.currentFilter} />
          <HeaderFilter visible={this.state.showHeaderFilter} />
          <SearchPanel visible={true} width={250} placeholder={'Search...'} />
          {/* set column */}
          <Column dataField={'defaultRefundMethodId'}
            caption={'ID'}
            headerFilter={{ allowSearch: true }} />
          <Column dataField={'firstName'}
            caption={'First Name'}
            headerFilter={{ allowSearch: true }} />
          <Column dataField={'surname'}
            caption={'Surname'}
            headerFilter={{ allowSearch: true }} />
          <Column dataField={'email'}
            caption={'Email'}
            headerFilter={{ allowSearch: true }} />
          <Column dataField={'phoneNumber'}
            caption={'Phone Number'}
            headerFilter={{ allowSearch: true }} />
          <Column dataField={'residenceCountry'}
            caption={'Residence Country'}
            headerFilter={{ allowSearch: true }} />
          <Column dataField={'residenceCity'}
            caption={'Residence City'}
            headerFilter={{ allowSearch: true }} />
          <Column dataField={'newDate'}
            caption={'Last Active'}
            alignment={'right'}
            dataType={'date'}
            calculateFilterExpression={this.calculateFilterExpression}
            headerFilter={{ dataSource: this.orderHeaderFilter }} />
        </DataGrid>
        {/* Filter options panel */}
        <div className={'options'}>
          <div className={'caption'}>Options</div>
          <div className={'option'}>
            <span>Apply Filter </span>
            <SelectBox items={this.applyFilterTypes}
              value={this.state.currentFilter}
              onValueChanged={this.onCurrentFilterChanged}
              valueExpr={'key'}
              displayExpr={'name'}
              disabled={!this.state.showFilterRow} />
          </div>
          <div className={'option'}>
            <CheckBox text={'Filter Row'}
              value={this.state.showFilterRow}
              onValueChanged={this.onShowFilterRowChanged} />
          </div>
          <div className={'option'}>
            <CheckBox text={'Header Filter'}
              value={this.state.showHeaderFilter}
              onValueChanged={this.onShowHeaderFilterChanged} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }: ApplicationState) => ({
  loading: users.loading,
  errors: users.errors,
  data: users.data
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAllUser: () => dispatch(getAllUser())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersIndexPage)