// @flow
import * as React from 'react';
import Selector from '../../generic/Selector/Selector';
import { defaultClassNamePrefix } from '../../common';
import type { CommonProps } from '../../common';
import type { Item } from '../../generic/Selector/Selector';
import type { StreamStateKeysForObservation } from '../../player/PlayerController/ControllerContext';

export type QualitySelectionStrategy = 'cap-bitrate' | 'lock-bitrate';

type Props = CommonProps & {
  bitrates?: Array<number>,
  currentBitrate?: number,
  lockedBitrate?: ?number,
  maxBitrate?: ?number,
  toggleContent: React.Node,
  updateProperty?: ({ lockedBitrate: ?number } | { maxBitrate: ?number }) => void,
  selectionStrategy?: QualitySelectionStrategy,
  autoLabel: string,
  formatBitrateLabel: (number, boolean) => string
};

const className = 'quality-selector';

class QualitySelector extends React.Component<Props> {
  static defaultProps = {
    classNamePrefix: defaultClassNamePrefix,
    selectionStrategy: 'cap-bitrate'
  };

  static streamStateKeysForObservation: StreamStateKeysForObservation = ['bitrates', 'currentBitrate', 'lockedBitrate', 'maxBitrate'];
  
  handleSelect = (item: Item) => {
    if (this.props.updateProperty && typeof item !== 'string') {
      if (this.props.selectionStrategy === 'lock-bitrate') {
        this.props.updateProperty({ lockedBitrate: item.data });
      } else {
        this.props.updateProperty({ maxBitrate: item.data });
      }
    }
  };

  bitrateToItem = (bitrate: number): Item => ({
    id: bitrate,
    label: this.props.formatBitrateLabel(bitrate, bitrate === this.props.currentBitrate),
    data: bitrate
  });

  isSelected = (item: Item, index: number, arr: Array<Item>) => {
    const { lockedBitrate, maxBitrate, selectionStrategy } = this.props;
    const matchValue = (lockedBitrate != null && maxBitrate != null) ? (selectionStrategy === 'locked-bitrate' ? lockedBitrate : maxBitrate) : lockedBitrate || maxBitrate; 
    if (matchValue === 'min') {
      return index === 1;
    } else if (matchValue === 'max') {
      return index === arr.length - 1;
    } else {
      return typeof item !== 'string' && item.id === matchValue;
    }
  };

  render() {
    const {
      bitrates,
      label,
      autoLabel,
      toggleContent,
      classNamePrefix
    } = this.props;
    if (Array.isArray(bitrates) && bitrates.length > 1) {
      const items = [{ id: 0, label: autoLabel, data: Infinity }].concat(bitrates.map(this.bitrateToItem));
      const selectedItem =
        items.filter(this.isSelected)[0] || items[0];

      return (
        <Selector
          items={items}
          classNamePrefix={classNamePrefix}
          className={className}
          selectedItem={selectedItem}
          label={label}
          onSelect={this.handleSelect}
          reverseOrder={true}
          expandedToggleContent={toggleContent}
          collapsedToggleContent={toggleContent}
        />
      );
    } else {
      return null;
    }
  }
}

export default QualitySelector;