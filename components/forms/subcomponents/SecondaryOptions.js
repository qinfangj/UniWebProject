import React from 'react';
import AsyncSecondaryOptionsList from './AsyncSecondaryOptionsList';


/**
 * List available basecallings output folders for a given run ID.
 */
export class BasecallingsOutputFolders extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.output_folder]; }
    render() {
        return (<AsyncSecondaryOptionsList
            table="basecallings" label="Unaligned data output folder" form={this.props.form}
            dependsOnField="runs"
            formatter={this.formatter} ref={(c) => {this._select = c;}}
        />);
    }
}


