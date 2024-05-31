import ChannelSingle from "./ChannelSingle";
import XRWindow from "./XRWindow";
import Dropdown from "./Dropdown";

const ChannelList = () => {
    // Note: Here we do zero height limitation. That would need to be done in the parent component.
    // This is useful for matching the size to the TV or for resizing the window.
    return (
        <XRWindow tight={true}>
            <div className="flex justify-between items-center mb-2.5">
                <Dropdown items={['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt']} />
                <p>13:37</p>
            </div>
            <div>
                <ChannelSingle src={"https://itv-api.ard.de/ardstart/img/services/28106.png"} title={"Das Erste"} description={"Surfreportage"} time={"13:00 → 14:15"} />
                <ChannelSingle src={"https://itv-api.ard.de/ardstart/img/services/28106.png"} title={"Das Erste"} description={"Surfreportage"} time={"13:00 → 14:15"} />
                <ChannelSingle src={"https://itv-api.ard.de/ardstart/img/services/28106.png"} title={"Das Erste"} description={"Surfreportage"} time={"13:00 → 14:15"} />
                <ChannelSingle src={"https://itv-api.ard.de/ardstart/img/services/28106.png"} title={"Das Erste"} description={"Surfreportage"} time={"13:00 → 14:15"} />
                <ChannelSingle src={"https://itv-api.ard.de/ardstart/img/services/28106.png"} title={"Das Erste"} description={"Surfreportage"} time={"13:00 → 14:15"} />
            </div>
        </XRWindow>
    )
};

export default ChannelList;