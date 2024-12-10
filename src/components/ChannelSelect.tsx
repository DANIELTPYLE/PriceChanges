import React from 'react';
import Select from 'react-select';
import { Channel } from '../types/price-change';
import { AVAILABLE_CHANNELS } from '../config/channels';

interface ChannelSelectProps {
  value: Channel[];
  onChange: (channels: Channel[]) => void;
}

export function ChannelSelect({ value, onChange }: ChannelSelectProps) {
  return (
    <Select
      isMulti
      value={value}
      onChange={(newValue) => onChange(newValue as Channel[])}
      options={AVAILABLE_CHANNELS}
      className="w-full"
      classNamePrefix="select"
      placeholder="Select channels..."
    />
  );
}