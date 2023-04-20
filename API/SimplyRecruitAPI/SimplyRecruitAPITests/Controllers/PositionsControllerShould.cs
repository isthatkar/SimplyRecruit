using AutoFixture.Xunit2;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SimplyRecruitAPI.Controllers;
using SimplyRecruitAPI.Data.Dtos.Positions;
using SimplyRecruitAPI.Data.Entities;
using SimplyRecruitAPI.Data.Repositories.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace SimplyRecruitAPITests.Controllers
{
    public class PositionsControllerShould
    {
        [Theory]
        [AutoData]
        public async Task ReturnAllPositions(
          IEnumerable<Position> positions,
          [Frozen] Mock<IPositionsRepository> positionsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new PositionsController(positionsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            positionsRepository.Setup(x => x.GetManyAsync()).ReturnsAsync(positions.ToList());

            var result = await sut.GetMany();

            Assert.Equal(positions.Count(), result.Count());
        }

        [Theory]
        [AutoData]
        public async Task ReturnPositionById(
          Position position,
          [Frozen] Mock<IPositionsRepository> positionsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new PositionsController(positionsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            positionsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(position);

            var result = await sut.Get(6);

            var actualItem = Assert.IsAssignableFrom<ActionResult<PositionDto>>(result);
            Assert.Equal(actualItem.Value.Id, position.Id);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfPositionWasNotFound(
          [Frozen] Mock<IPositionsRepository> positionsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new PositionsController(positionsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            positionsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Position)null);

            var result = await sut.Get(6);

            var resultType = Assert.IsAssignableFrom<ActionResult<PositionDto>>(result);
            Assert.IsType<NotFoundResult>(resultType.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfPositionWasNotFoundWhenEditingPosition(
            UpdatePositionDto updatePositionDto,
            [Frozen] Mock<IPositionsRepository> positionsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new PositionsController(positionsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            positionsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Position)null);

            var result = await sut.Update(6, updatePositionDto);

            var resultType = Assert.IsAssignableFrom<ActionResult<Position>>(result);
            Assert.IsType<NotFoundResult>(resultType.Result);
        }

        [Theory]
        [AutoData]
        public async Task ReturnOkayResultWhenPositionEditedSuccessfully(
           UpdatePositionDto updatePositionDto,
           Position position,
           [Frozen] Mock<IPositionsRepository> positionsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new PositionsController(positionsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            positionsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(position);

            var result = await sut.Update(6, updatePositionDto);

            var resultType = Assert.IsAssignableFrom<ActionResult<Position>>(result);
            Assert.IsType<OkObjectResult>(resultType.Result);
            positionsRepository.Verify(s => s.UpdateAsync(It.Is<Position>(p => p.Id == position.Id)), Times.Once);
        }

        [Theory]
        [AutoData]
        public async Task ReturnNotFoundIfPositionWasNotFoundWhenTryingToDeletePosition(
            [Frozen] Mock<IPositionsRepository> positionsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new PositionsController(positionsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            positionsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync((Position)null);

            var result = await sut.Remove(6);

            Assert.IsAssignableFrom<NotFoundResult>(result);
        }


        [Theory]
        [AutoData]
        public async Task ReturnNoContentIfPositionDeletedSuccessfully(
           Position position,
           [Frozen] Mock<IPositionsRepository> positionsRepository)
        {
            var userId = "testUserId";
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
            }));
            var sut = new PositionsController(positionsRepository.Object);
            sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            positionsRepository.Setup(x => x.GetAsync(It.IsAny<int>())).ReturnsAsync(position);

            var result = await sut.Remove(6);

            var resultType = Assert.IsAssignableFrom<NoContentResult>(result);
            positionsRepository.Verify(s => s.DeleteAsync(It.Is<Position>(p => p.Id == position.Id)), Times.Once);
        }

    }
}
