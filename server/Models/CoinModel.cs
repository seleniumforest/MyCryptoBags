using System;

namespace Server.Models
{
    public class CoinModel
    {
        public string Id { get; set; }
        public string Label { get; set; }
        public double? MarketCap { get; set; }
    }
}