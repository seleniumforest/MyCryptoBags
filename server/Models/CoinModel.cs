using System;

namespace Server.Models
{
    public class CoinModel
    {
        public string id { get; set; }
        public string label { get; set; }
        public decimal? price { get; set; }
        public int count = 0;
    }
}