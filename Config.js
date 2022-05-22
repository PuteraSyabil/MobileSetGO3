class Config
{
    constructor(backgroundColour, framework,type,footer,header)
    {
        this.backgroundColour= backgroundColour;
        this.framework=framework;
        this.type=type;
        this.footer=footer;
        this.header=header;
    }
    setType(type)
    {
        this.type=type;
    }
    setBackgroundColour(backgroundColour)
    {
        this.backgroundColour=backgroundColour;
    }
    setFramework(framework)
    {
        this.framework=framework;
    }
    setFooter(footer)
    {
        this.footer= footer;
    }
    setHeader(header)
    {
        this.header=header;
    }
}

module.exports=Config;