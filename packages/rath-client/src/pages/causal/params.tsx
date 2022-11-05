import {
    Dropdown,
    IconButton,
    Label,
    Panel,
    PanelType,
    PrimaryButton,
} from '@fluentui/react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { makeRenderLabelHandler } from '../../components/labelTooltip';
import { useGlobalStore } from '../../store';
import { CAUSAL_ALGORITHM_FORM, CAUSAL_ALGORITHM_OPTIONS, ICausalAlgorithm } from './config';
import DynamicForm from './dynamicForm';

const Params: React.FC = (props) => {
    const { causalStore } = useGlobalStore();
    const { causalParams, showSettings } = causalStore;
    return (
        <div>
            <IconButton
                text="Params"
                iconProps={{ iconName: 'Settings' }}
                onClick={() => causalStore.toggleSettings(true)}
            />
            <Panel
                isOpen={showSettings}
                type={PanelType.medium}
                onDismiss={() => {
                    causalStore.toggleSettings(false);
                }}
            >
                
                <Label>Settings</Label>
                <Dropdown
                    label="Algorithm"
                    options={CAUSAL_ALGORITHM_OPTIONS}
                    selectedKey={causalParams.algorithm}
                    onChange={(e, o) => {
                        o && causalStore.switchCausalAlgorithm(o.key as ICausalAlgorithm);
                    }}
                    onRenderLabel={makeRenderLabelHandler('The algorithm to use.')}
                />
                <DynamicForm
                    form={CAUSAL_ALGORITHM_FORM[causalParams.algorithm as ICausalAlgorithm]}
                    values={toJS(causalParams)}
                    onChange={(key, value) => {
                        causalStore.updateCausalParamsValue(key as any, value);
                    }}
                />
                <PrimaryButton
                    style={{ marginTop: '10px' }}
                    text="Run"
                    onClick={() => {
                        causalStore.reRunCausalDiscovery();
                        causalStore.toggleSettings(false);
                    }}
                />
            </Panel>
        </div>
    );
};

export default observer(Params);